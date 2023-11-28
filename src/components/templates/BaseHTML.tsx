export const BaseHTML = ({ children }: Html.PropsWithChildren) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BETH-STACK - indrazm</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/public/globals.css" />
        <script src="https://unpkg.com/htmx.org@1.9.9"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/disable-element.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        
    </head>
    <body>
        ${children}
        <script>
            const boxes = document.querySelectorAll('.box');
            const tl = gsap.timeline({ defaults: { duration: 0.655, ease: 'power2.inOut' } });
            tl.from(boxes, { opacity: 0, stagger: 0.2 });
            tl.play();
        </script>
    </body>
    </html>`;
};
