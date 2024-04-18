import back from '/back.jpg';

export default function LeftBottomShape() {
    return (
        <div>
        <div className="hidden md:block absolute z-10 -left-6 -bottom-6">
          <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
        </div>
  
        {/* Left bottom  */}
        <div
          className="hidden md:block absolute -bottom-40 -left-40 h-96 w-64 bg-white -rotate-45"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back})`, backgroundSize: '150%' }}
        ></div>
  </div>
    )
}