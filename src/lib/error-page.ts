export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>لمسة ورد</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 Cairo, system-ui, sans-serif; background: #fbf7f4; color: #3b2430; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #6b5560; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 999px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #c45b7a; color: #fff; }
      .secondary { background: #fff; color: #3b2430; border-color: #eadfe3; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>تعذّر تحميل الصفحة</h1>
      <p>حدث خطأ غير متوقع. يمكنكِ المحاولة مجدداً أو العودة للرئيسية.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">إعادة المحاولة</button>
        <a class="secondary" href="/">العودة للرئيسية</a>
      </div>
    </div>
  </body>
</html>`;
}
