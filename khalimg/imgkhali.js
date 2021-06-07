const url = ['https://static.langimg.com/imagenext/nbtblogs/photo/viral-adda/wp-content/uploads/2021/05/the-great-khali-old-jawani-pics-memes.jpg'
,'https://i.pinimg.com/564x/3b/10/21/3b102130dc0ee0a5b1ff6efeea5e83dc.jpg',
'https://simg-memechat.s3.ap-south-1.amazonaws.com/6a5c58b316c6c83819d7282d63ad9bcd.jpg',
'https://pics.me.me/pehle-mai-din-bhar-mobile-charge-karta-tha-aughing-fir-32709775.png'
,'https://scontent.fagr1-2.fna.fbcdn.net/v/t1.6435-9/53441985_326946031272919_1154697048381980672_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=9267fe&_nc_ohc=bxATBZZUUtYAX9f6b2X&_nc_ht=scontent.fagr1-2.fna&oh=852701029355a39bfe933d39c19de70a&oe=60E39445'
,'https://i.redd.it/34g9zfsibqw41.jpg'
,'https://qph.fs.quoracdn.net/main-qimg-b472fc9dba752d48d66b930860a2c568'
,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp8Mr-sOgu3iKQtwaBPZCpKoyEi9nTf1Vsng&usqp=CAU'
,'https://qph.fs.quoracdn.net/main-qimg-ee67c9adfd13bdc792e1a7a7dfd6c34a'] ; 

module.exports = () =>{

return url[Math.floor(Math.random() * 9)];

};