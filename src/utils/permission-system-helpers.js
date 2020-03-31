import { checkNested } from './checkNested'

const isAdmin = access => access.isAdmin

const havePermission = (options = {}) => {
  let userRoles = checkNested(options, 'access') ? options.access.UserRoles : []
  let havePermission = false

  //decidindo se vou aplicar contexto aos userRoles
  if (options.context) {
    userRoles = userRoles.filter(ur => {
      return ur.Role.context === options.context
    })
  }

  //decidindo se vou aplicar course_id aos userRoles
  if (typeof options.course_id) {
    userRoles = userRoles.filter(ur => {
      return ur.Course.id === options.course_id
    })
  }

  //procurando pela permissão solicitada.
  if (options.permission) {
    havePermission = userRoles
      .map(ur => {
        return ur.Role.RolePermissions.map(rp => {
          return rp.Permission.name === options.permission
        }).includes(true)
      })
      .includes(true)
  }

  return havePermission
}

export const checkAccess = options => {
  const { access, permission, course_id } = options

  if (isAdmin(access)) return true

  const haveGlobalPermission = havePermission({ access, context: 'GLOBAL', permission })
  if (haveGlobalPermission) return true

  const haveCoursePermission = havePermission({ access, context: 'COURSE', course_id, permission })
  if (haveCoursePermission) return true

  return false
}
