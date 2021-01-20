# README #

### Solución para que la ventana completa de vimeo no cierre la app al presionar botón fisico de volver ###

add this in MainActivity.java
```java
@Override
public void onBackPressed() {
    this.appView.loadUrl("javascript:if (document.webkitExitFullscreen) {document.webkitExitFullscreen();}");
    return;
}
```

