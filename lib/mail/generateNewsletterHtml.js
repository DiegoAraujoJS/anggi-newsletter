export async function generateNewsletterHtml(post) {
  const { title, date, body, id} = post

  const formattedDate = new Date(date).toLocaleDateString();
  const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL}/posts/${id}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          margin: 3rem auto 6rem;
        }
        .email-container {
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          background-color: #f2ead3;
        }
        .content-container {
          margin: 0 200px;
        }
        .title {
          background-color: #d6d46d;
          color: black;
          font-size: 1.875rem;
          border-radius: 0.5rem;
          padding: 0.5rem;
          margin-bottom: 1rem;
        }
        .date {
          color: #666;
          margin-bottom: 1rem;
        }
        .content {
          font-size: 1rem;
        }
        .blog-link {
          display: block;
          width: 200px;
          margin: 2rem auto;
          padding: 10px 20px;
          color: white;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="content-container">
          <p class="title">${title}</p>
          <div class="date">${formattedDate}</div>
          <div class="content">${body}</div>
          <a href="${blogUrl}" class="blog-link">Leer en el blog</a>
        </div>
      </div>
    </body>
    </html>
  `;
}
