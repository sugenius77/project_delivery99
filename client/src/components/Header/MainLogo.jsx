import styled from 'styled-components';
import MenuToggle from './MenuToggle';

const Div = styled.div`
    font-size: 32px;
    display: flex;
    padding-top: 1.5vh;
`;
const Logo = styled.div`
    display: flex;
    padding: 8px 12px;
    margin-left: 1em;
    align-items: center;
    img {
        margin-right: 12px;
    }
`;
const MainLogo = ({ innerWidth, toggleHandler, logoName }) => {
    return (
        <Div>
            <Logo>
                <img src={`${process.env.PUBLIC_URL}/header/logo_48.png`} alt="logo" />
                <strong>{logoName}</strong>
            </Logo>

            {innerWidth <= 1040 && <MenuToggle toggleHandler={toggleHandler} />}
        </Div>
    );
};

export default MainLogo;
