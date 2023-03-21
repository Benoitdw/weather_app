import { useNavigate } from "react-router-dom";


const Nav = (props:{is_main:boolean}) => {
  const navigate = useNavigate()
  return (
    <nav className="flex h-[48px] justify-between w-full text-[24px] semi-bold">
      <div>
        {!props.is_main? 
          <button className="h-full" onClick={() => navigate('/')}>
            <i className="m-[12px] ri-arrow-go-back-line"></i>
          </button>
        : ""}
      </div>
      <div>
        <button className="h-full" onClick={() => navigate('/search')}>
          <i className="m-[12px] ri-search-2-line"></i>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
