# Push Notification Ionic 3
*Ultima Actualización: 8/2/2020*
## Instalación
```js
  // Requerimiento Android v7.1.4

  $ ionic cordova plugin add phonegap-plugin-push
  $ npm install --save @ionic-native/push@4


  // Agregar en app.module.ts
  import { Push } from '@ionic-native/push';

  providers: [
    ...
    Push,
  ]

  // https://ionicframework.com/docs/v3/native/push/
```
## Agregar provider PUSH
Dentro de la carpeta providers agregar carpeta push donde está contenido este archivo

## Definición de variables de entorno en constants
```ts
  // PUSH SERVER ENDPOINTS
  public static PUSH_APP_ID ='5cb76e58ab5af1207ea405bb';
  public static PUSH_SERVER_URL ='http://sd-1060583-h00012.ferozo.net:3050/api';
  public static PUSH_SERVER_REGISTER_ID ='/users/ensure';
  public static PUSH_GET_MESSAGE='/message/';
  public static PUSH_ICON_COLOR ='#001C6F';
  public static PUSH_ICON_NAME ='ic_stat_notifications';
```
## Agregar en config.xml dentro de platform > android
```xml
  <resource-file src="google-services.json" target="app/google-services.json" />

  Agregar en la carpeta raiz de la carpeta que contiene la app el archivo google-services.json
```

## Agregar en config.xml dentro de platform > ios
```xml
  <resource-file src="GoogleService-Info.plist" />

  Agregar en la carpeta raiz de la carpeta que contiene la app el archivo GoogleService-Info.plist
```

## Implementación general en Home (solo si está logueado) y Login
```js
    const user = {
      userApp: Constants.ID_USUARIO
      };
    this.pushProvider.enablePN(user);
```
## Implentación de Foreground notification en App.component
```js

    import { Events } from 'ionic-angular';


    constructor(public events: Events){}



    //Show Foreground Notification
    this.events.subscribe('foregroundNotification', (notification) => {
      console.log(notification.title + " - " + notification.message)
      const toast = this.toastCtrl.create({
        message: notification.title + ': ' + notification.message,
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Cancelar Notificación');
      });
      toast.present();
    });

```
## Configuración del Icono en Android

1) Generar iconos con la plataforma:
http://romannurik.github.io/AndroidAssetStudio/icons-notification.html
2) Poner el nombre del icono ic_notification
3) Desacargar
4) Pegar en la carpeta @mimap en las que corresponda según resolución (hdpi,xhdpi)
```
Ubicación:
platforms > android > app > src > res
```
<!-- 5) Definir nombre y color en las opciones de push de la siguiente manera:
```js
      android: {
        icon: "ic_stat_notifications",
        iconColor: "#001C6F"
      }
``` -->

5) Pegar el siguiente código:
```
Ubicación:
platforms > android > app > src > AndroidManifest.xml
Ubicar dentro del tag <application> al mismo nivel de <activity>
```
```xml

<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/ic_notification" />
<meta-data android:name="com.google.firebase.messaging.default_notification_color" android:resource="@color/notification" />
```
6) Crear un archivo llamado **colors.xml** con el color deseado y pegarlo en la ubicación indicada

```
Ubicación:
platforms > android > app > src > main > res > values
```
*al mismo nivel de strings.xml*

```xml
<?xml version='1.0' encoding='utf-8'?>
<resources>
    <color name="notification">#307cff</color>
</resources>
```
## Envio de Notificaciones desde API ##

POST
```
http://vps-1060583-x.dattaweb.com:3101/api/notifications
```
BODY
```JSON
{
	"app":"5d790986a34a803b37b27976",
	"usersApp":["2399"], 
	"forAll":false,
	"type":"1",
	"title":"Probando notificación",
	"message":"Texto de la notificación..."
}
```
USANDO la librería trae: https://github.com/Huemul/trae/tree/v1
```js
trae.post('http://vps-1060583-x.dattaweb.com:3101/api/notifications', {
	app:"5d790986a34a803b37b27976",
	usersApp:["2399"], 
	forAll:false,
	type:"1",
	title:"Probando notificación",
	message:"Texto de la notificación..."
})
  .then(() => {
    console.log('Success!!!');
  })
  .catch((err) => {
    console.error(err);
  });
  ```
