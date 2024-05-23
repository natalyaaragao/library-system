import Card from '../../components/card/Card'

function ReadBiblioteca() {
    const items = [
        {
            id: 1, 
            nome: "BBM- Biblioteca Brasiliana Guita e José Mindlin",
            tel: "(11) 3091-1154 / 2648-0317",
            email: "biblioteca@bbm.usp.br",
            site: "https://www.brasiliana.usp.br",
            endereco: "Rua da Biblioteca, s/n - Cid. Universitária - 05508-050",
            cidade: "São Paulo",
            atendimento: "Administração - Segunda-feira a sexta-feira, das 8h às 17h. Pesquisa - Segunda-feira a sexta-feira, das 8h30 às 17h (Obs.: solicitação de documentos para consulta serão aceitas até as 16h). Exposições - Segunda-feira a sexta-feira, das 8h30 às 18h30. Sala de Leitura Lampadia - Segunda-feira a sexta-feira, das 9h às 17h / Sábado, das 9h às 13h",
            assuntos: "Brasiliana, História das Bibliotecas, Obras raras",
            areas: "Humanas"
        },
        {   id: 2, 
            nome: "CDCC – Centro de Divulgação Científica e Cultural",
            tel: "(11) 3091-1154 / 2648-0317",
            email: "bib@cdcc.usp.br, sbicdcc@cdcc.usp.br",
            site: "https://www.cdcc.usp.br/bibli",
            endereco: "Rua Nove de Julho, 1.227 - Centro - 13560-042",
            cidade: "São Carlos",
            atendimento: "2ª a 6ª (8h - 18h) - sáb. (9h - 12h)",
            assuntos: "Educação em Ciências, Generalidades",
            areas: "Biológicas, Exatas, Humanas"
        }
    ];
    return (
        <div className="containerCard">
            {items.map(
                (item) => (
                    <Card 
                        key = {item.id} 
                        {...item} 
                    />
                )
            )}
        </div>
        
    );
};

export default ReadBiblioteca;