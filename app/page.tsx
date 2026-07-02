
export default function Home() {
  return (
    <article className="markdown max-w-3xl">
      <h1>Welcome to Demo AI</h1>
      <p>
        This page demonstrates a markdown theme for rendered markdown content.
        Use the <code>markdown</code> container class to apply the theme to your
        markdown output.
      </p>
      <h2>Getting started</h2>
      <p>
        You can place markdown HTML inside an element with the{' '}
        <code>markdown</code> class and it will receive consistent typography,
        links, code blocks, tables, and quote styles.
      </p>
      <blockquote>
        <p>
          A markdown theme makes text content easier to scan and more pleasant to
          read.
        </p>
      </blockquote>
      <pre>
        <code>{`const example = 'Hello world';
console.log(example);`}</code>
      </pre>
      <p>
        Learn more in the{' '}
        <a href="https://tailwindcss.com/docs/typography-plugin">Tailwind
        typography</a>{' '}
        ecosystem if you want richer markdown styling.
      </p>
    </article>
  );
}
