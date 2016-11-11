
import freemarker.template.Configuration
import spark.Route
import spark.Spark.*
import java.io.File
import java.io.StringWriter
import java.util.*

fun main(args: Array<String>) {
    port(8080)
    externalStaticFileLocation("static")
    get("/", "*", Route { request, response ->
        try {
            val configuration = Configuration()
            configuration.setDirectoryForTemplateLoading(File("templates"))
            val temp = configuration.getTemplate("index.ftlh")
            val writer = StringWriter()
            val data = HashMap<String, Object>()
            temp.process(data, writer)
            return@Route writer.toString()
        } catch (e: Exception) {
            e.printStackTrace()
            return@Route e.message
        }
    })
}