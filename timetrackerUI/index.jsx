const rootNode = document.getElementById("app");    // элемент для рендеринга приложения React
// получаем корневой элемент 
const root = ReactDOM.createRoot(rootNode);
// рендеринг в корневой элемент
root.render(
  <h1>There is nothing to see for now.</h1>  // элемент, который мы хотим создать
);