export const BaseHTML = ({ children }: Html.PropsWithChildren) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="/public/globals.css" />
        <script src="https://unpkg.com/htmx.org@1.9.9"></script>
    </head>
    <body>
        ${children}
    </body>
    </html>`;
};
