import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>This page could not be found.</p>
      <Link href="/" className="not-found-link">
        Back to home
      </Link>
    </main>
  );
}
