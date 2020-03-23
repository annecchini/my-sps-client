import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Button } from 'react-bootstrap'

const NotFound = props => {
  return (
    <Card className="mt-2 mx-2">
      <Card.Header as="h5">Página não encontrada</Card.Header>
      <Card.Body>
        <Card.Title>A página solicitada não existe.</Card.Title>
        <Card.Text>
          O conteúdo pode ter sido removido ou disponibilizado em outro link. Sugerimos acessar a página inicial do
          sistema e reiniciar a navegação.
        </Card.Text>
        <LinkContainer to="/">
          <Button variant="primary">Ir para a página inicial</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}

export default NotFound
