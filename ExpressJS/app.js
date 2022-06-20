const express = require("express");
const app = express();
app.use(express.json()); // it is necessary to post. that means express have a body also in body have a json so split it.
app.use(express.urlencoded()); // this is necessary for using data with form data
// aşağıdaki kod dışarıya açık klasörlerimize erişime açtığımızda kullanılmak için
// bunun için dosyamızı public klasörünün içine koyalımç
app.use(express.static("public")); // http://localhost:3000/read.txt

// Router da ki user işlemlerini kullanmak için i
const userRouter = require("./router/userRouter");
// Home router sayfasını kullanmak için
const homeRouter = require("./router/homeRouter");

// sonuçta router dosyamızda aslında bir middleware olduğundan dolayı y
// bunu da use ile belitmemiz lazım ama burada dikkat edersek eğer filtre olarakan
// users vermişisz bu da demek oluyor ki zaten bu router çalıştğında users filtresi devreye girecek
// haliyle router dosyamızdaki users filtrelerini kaldırmazsak şöyle ekstra /users/users şeklinde bir filtre olur
// o yüzden router dosyamızdaki filtreleri kaldıralım ama /users/:id varsa eğer sadece users kısmı kaldırırlır.
app.use("/users", userRouter); // users router
app.use("/", homeRouter); //home page router
// eğer yukarıdaki filtrelere girerse ve biz orada response kullandığımız için bir aşağıdakine girmez
// ama yukarıdaki filtrelere girmezse yani onları bulamazsa aşağıdaki kullanılır.
app.use((request, response) => {
  response.status(404).send("Sayfa bulunamadı :(");
});
/* app listener */
app.listen(3000, () =>
  console.log("Server is listening with 3000 port number")
);
