import './Card.css'

export const Card = (props) => {
      return (
        <div className='card' key = {props.id}>  
          <h1>{props.nome}</h1>
          <div className="cardContent">
            <div className="col">
                <div className="cardItem">
                    <h3>Telefone: </h3>
                    <p>{props.telefone}</p>
                </div>
                <div className="cardItem">
                    <h3>Email: </h3>
                    <p>{props.email}</p>
                </div>
                <div className="cardItem">
                    <h3>Site: </h3>
                    <p>{props.site}</p>
                </div>
                <div className="cardItem">
                    <h3>Endereço: </h3>
                    <p>{props.rua}, {props.numero} - {props.bairro} - {props.cep}</p>
                </div>
                <div className="cardItem">
                    <h3>Cidade: </h3>
                    <p>{props.cidade}</p>
                </div>
            </div>
            <div className="col">
                <div className="cardItem">
                    <h3>Atendimento: </h3>
                    <p>{props.horarioFuncionamento}</p>
                </div>
                <div className="cardItem">
                    <h3>Assuntos: </h3>
                    <p>{props.assuntos}</p>
                </div>
                <div className="cardItem">
                    <h3>Areas: </h3>
                    <p>{props.areaConhecimento}</p>
                </div>
            </div>
          </div>
          
          
        </div>
      );
}

export default Card

