const express = require("express");
const app = express();

// app.user(exports.json) bu express tarafından gelen bir middlewaredir

/* MiddleWare aslında requestten responsa kadar olan katman yazılımlardır.
    Yani aslında biz request yaptığımızda isteğimiz doğrultusunda belirli filtrelerden
    geçerek responsa gider işte bu her biri filtre olan katmanlara middleware denir.
*/

// örneğin app.use bizden bir middleware bekler. Aslında put post bunların her biri bir middlewaredir
// ama put post delete vb işlemler çok kullanıldığından bunlara bu isimle ulaşırız
// yoksa normalde user kullanılırdı. Öreneğin app.get("/") diyerek filtreleme yapıyoruz
// yani bunun anlamı sadece anadizine gelen demek. /users olduğunda sadece anadizin altında bulunun users için filtreleme yapıyoruz.

// kendi oluşturduğumuz middleware.. Buradaki next bir sonraki middleware geçmek için kullanılır bunu belirtmezsek asla bir sonraki middleware geçmez
// requestten responsa kadar birçok middleware olacağı gibi sadece 1 tane de olabilir.
function midOne(request, response, next) {
  console.log("our middleware One");
  next();
}

//middleware lerin çalışması için request olması yani server isteği olması yani server
//aksi halde serverdan istek olmadığı için request ve responsa arasında çalışan bu middlewareler de çalışmaz.

//how we use our middleware
app.use(midOne); // burada çağırım yapmıyoruz referans veriyoruz ismi ile fonksyion aç kapa yapmıyoruz.

// ya da daha bilinen bir yöntemle middlewre tanımlayalım. get post vb gibi

// eğer ikinci middleware geçmek istiyorsak ilk çalışan midOne a next() Dememiz şart aksi halde sonraki middleware geçmez.

//Middleware sonlandrımak için responsa ulaşmak grek bu noktada da response.send demek gerek.

app.use((request, response, next) => {
  // bu middleware in filtrelemsi olmadığından her istekte çalışır
  // ama eğer /users vs yapsaydık sadece users isteğinde çalışır.
  console.log("our middleware Two");
  response.send("You are finally arrive to response. :) ");
});

/* Aslında Middleware aşağıdaki gibidr bu yüzden put post get birer middlewaredir

app.use("/users", function(request, response, next) => {
  console.log("our middleware Two");
  response.send("You are finally arrive to response. :) ");
});

*/

app.listen(3000, () => {
  console.log("port 3000 is listening...");
});
