// Bump this string and `git push origin main` to verify push-to-redeploy.
const VERSION = 'v1 — initial deploy';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: '#1c1917',
      }}
    >
      <div
        aria-hidden
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: '#fff7ed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
          color: '#ea580c',
          marginBottom: 24,
          border: '3px solid #ea580c',
        }}
      >
        ✅
      </div>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        V1.0 user-repo smoke
      </h1>
      <p style={{ color: '#57534e', marginTop: 16, fontSize: '1.1rem', maxWidth: 480 }}>
        Deployed from <code style={{ background: '#f5f5f4', padding: '2px 6px', borderRadius: 4 }}>github.com/smorchestraai-code/eo-template-v1-smoke</code> via Entrepreneurs Oasis.
      </p>
      <p style={{ color: '#a8a29e', marginTop: 8, fontSize: '0.875rem' }}>{VERSION}</p>
      <p style={{ color: '#a8a29e', marginTop: 32, fontSize: '0.75rem', maxWidth: 460 }}>
        Push a commit to <code style={{ background: '#f5f5f4', padding: '1px 4px', borderRadius: 3 }}>main</code> and refresh in ~90s. Coolify&rsquo;s auto-webhook should rebuild the container with no extra config.
      </p>
    </main>
  );
}
