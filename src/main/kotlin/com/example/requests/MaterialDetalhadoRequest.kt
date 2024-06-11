import kotlinx.serialization.Serializable
import com.example.models.MaterialDetalhado

@Serializable
class MaterialDetalhadoRequest(
    val titulo: String,
    val descricao: String,
    val entradaPrincipal: String, 
    val imprenta: String,
    val edicao: String,
    val nota: String,
    val assunto: String,
    val localizacaoItem: String,
    val statusItem: Int,
    val colecao: String,
    val paginas: Int,
    val numReservas: Int,
    val codigoDeBarras: String,
    val nomeBiblioteca: String
)

fun MaterialDetalhadoRequest.toMaterialDetalhado(): MaterialDetalhado {
    return MaterialDetalhado(
        titulo = titulo,
        descricao = descricao,
        entradaPrincipal = entradaPrincipal, 
        imprenta = imprenta,
        edicao = edicao,
        nota = nota,
        assunto = assunto,
        localizacaoItem = localizacaoItem,
        statusItem = statusItem,
        colecao = colecao,
        paginas = paginas,
        numReservas = numReservas,
        codigoDeBarras = codigoDeBarras,
        nomeBiblioteca = nomeBiblioteca
    )
}