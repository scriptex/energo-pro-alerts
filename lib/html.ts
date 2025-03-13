import { style } from "./style";

export function html(text: string) {
  return `
  <html>
  <head>
    <title>Energo Pro Варна | Съобщения за аварии</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
    />

    <link rel="shortcut icon" type="image/x-icon" href="https://atanas.info/images/favicon/favicon.ico" />

    <style>${style}</style>

    <script src="https://unpkg.com/scriptex-socials" async></script>
    
    <script>
      (function(d, h, m){
        var js, fjs = d.getElementsByTagName(h)[0];
        if (d.getElementById(m)){return;}
        js = d.createElement(h); js.id = m;
        js.onload = function(){
          window.makerWidgetComInit({
          position: "left",          
          widget: "egtvfprlpcdjg1i4-8syknhxgseddkfli-j45otk13qspl7fts"                
        })};
        js.src = "https://makerwidget.com/js/embed.js";
        fjs.parentNode.insertBefore(js, fjs)
      }(document, "script", "dhm"))
    </script>
  </head>
  <body>
    <a
      href="https://github.com/scriptex/energo-pro-varna-alerts/"
      title="See code on Github"
      class="github-fork-ribbon"
      data-ribbon="See code on Github"
    >
      See code on Github
    </a>

    <main>
      <h1>Energo Pro Варна: Планирани прекъсвания и аварии</h1>

      ${text}
    </main>

    <footer>
      <social-links></social-links>
    </footer>
  </body>
  </html>`;
}
