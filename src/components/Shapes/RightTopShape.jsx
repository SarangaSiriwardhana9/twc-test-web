import back from '/back.jpg';

export default function RightTopShape() {
    return (
        <div>
            <div>
                <div
                    className="hidden md:block absolute -top-20 -mt-2 -right-60 h-64 w-96 bg-white rotate-45"
                    style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back}) `, backgroundSize: '100%', }}
                ></div>
                <div className="hidden md:block absolute -right-6 -top-6">
                    <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
                </div>
            </div>
        </div>
    )
}