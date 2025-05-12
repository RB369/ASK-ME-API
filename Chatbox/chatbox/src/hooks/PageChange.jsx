import { useNavigate } from 'react-router-dom';

const Pagechange = () => {
    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path);
    };

    return goTo;
};

export default Pagechange;
