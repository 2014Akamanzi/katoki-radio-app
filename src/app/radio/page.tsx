export default function RadioPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Katoki Radio</h1>
      <p className="mb-6">Live stream coming soon</p>

      <audio controls autoPlay className="w-full max-w-md">
        <source
          src="https://servidor30.brlogic.com:7036/live"
          type="audio/mpeg"
        />
        Your browser does not support audio playback.
      </audio>
    </main>
  );
}
