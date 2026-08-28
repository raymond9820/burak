/* Project Standart:
-Logging standarts
-Naming standarts:
  function method , variable => Camel
  class => PASCAL
  folder file => KEBAB
  css => SNAKE
  -Error handling
  */

/*Traditional Api
  Rest Api
  GraphQL Api
  ...
  */

/* 
  Taditional -FD => BSSR (Admin) =>EJS
  Modern -Fd    => SPA  (User's application) => REACT 
  */

/*Sening loyihangdagi oqim (restaurant.controller.ts, 49-53 qatorlar):

1) Foydalanuvchi /admin/signup ga POST yuboradi
        ↓
2) processSignup() ishlaydi, memberService orqali DB'ga yoziladi
        ↓
3) req.session.member = result   <- "bu foydalanuvchi endi tanilgan" deb belgilanadi
        ↓
4) req.session.save()   <- bu ma'lumot MongoDB'dagi "sessions" collection'ga yoziladi
        ↓
5) Keyingi so'rovlarda (masalan /admin/dashboard) 
   brauzer avtomatik cookie yuboradi -> server sessionni MongoDB'dan topadi
   -> "ha, bu login qilgan foydalanuvchi" deb biladi, qayta login so'ramaydi */
