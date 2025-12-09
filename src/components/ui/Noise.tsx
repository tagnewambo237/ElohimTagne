export default function Noise() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05] mix-blend-overlay">
            <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
        </div>
    );
}
