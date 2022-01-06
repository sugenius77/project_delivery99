import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import api from '../../utils/api/api';

const Div = styled.div`
    padding-top: 10vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-grap: 1em;
    place-items: center;
    justify-content: center;
    min-height: 100vh;
    grid-auto-columns: minmax(100px, auto);
    grid-gap: 0.5rem;
    background-color: #cae8f9;
    @media screen and (max-width: 680px) {
        display: flex;
        flex-direction: column;
    }
`;

const ItemWrap = styled.div`
    .ItemWrap {
        width: 20vw;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border-radius: 6px;
        margin: 0 1vw;
        @media screen and (max-width: 680px) {
            width: 100%;
            margin: 0;
        }
    }

    .ItemWrap-Top {
        display: flex;

        height: 35vh;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #e2e5e7;
        color: #566270;
        font-size: 2.25rem;
        justify-content: center;
        text-align: center;
        align-items: center;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .ItemWrap-Body {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        font-size: 1rem;
        font-weight: bold;
        justify-content: center;
        display: flex;
        align-items: start;
    }

    .ItemWrap-Body-Title {
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: calc(1vw + 1vh + 1vmin);
    }

    .ItemWrap-Rating {
        padding: 10px 12px;
        font-weight: bold;
        font-size: 2rem;
        display: flex;
        justify-content: right;
        align-items: center;

        img {
            max-width: 3rem;
            min-width: calc(1vw+1vh+1vmin);
        }
    }
`;

const Item = ({ imgSrc, menuName, rating }) => {
    const [toggle, setToggle] = useState(false);
    const [number, setNumber] = useState(rating);
    const plusHandler = () => {
        if (toggle === false) {
            setNumber((cur) => cur + 1);
        } else if (toggle === true) {
            setNumber((cur) => cur - 1);
        }
        setToggle((cur) => !cur);
    };
    return (
        <ItemWrap>
            <div className="ItemWrap">
                <div className="ItemWrap-Top ">
                    <img src={`${process.env.PUBLIC_URL}${imgSrc}`} alt={`'메뉴이미지'`} />
                </div>
                <div className="ItemWrap-Rating">
                    <div className="ItemWrap-Body-Title ">{menuName}</div>
                    <button onClick={plusHandler}>
                        <img src={`${process.env.PUBLIC_URL}/${toggle ? 'heart_on.png' : 'heart_off.png'}`} alt="좋아요" />
                    </button>
                    {number}
                </div>
            </div>
        </ItemWrap>
    );
};

const Detail = () => {
    const { id } = useParams();
    const [menuData, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRealTime = useCallback(async () => {
        const res = await api.menu.getMenu(id);
        console.log(res);
        setMenu((cur) => {
            const newMenu = [];
            newMenu.push({ menu_name: 'BBQ', image_url: '/images/1-1.png', toggle_rating: 14 });
            newMenu.push({ menu_name: 'BHC', image_url: '/images/1-2.png', toggle_rating: 13 });
            newMenu.push({ menu_name: '치킨플러스', image_url: '/images/1-3.png', toggle_rating: 14 });
            newMenu.push({ menu_name: 'BBQ', image_url: '/images/1-4.png', toggle_rating: 14 });
            newMenu.push({ menu_name: 'BHC', image_url: '/images/1-5.png', toggle_rating: 13 });
            newMenu.push({ menu_name: '치킨플러스', image_url: '/images/1-6.png', toggle_rating: 14 });
            return newMenu;
        });
        //eslint-disable-next-line
    }, [id]);
    useEffect(() => {
        getRealTime();
        //eslint-disable-next-line
    }, [getRealTime]);

    return (
        <Div>
            {menuData.map((menu, idx) => {
                return <Item key={idx} imgSrc={menu.image_url} menuName={menu.menu_name} rating={menu.toggle_rating} />;
            })}
            {/* <ScrollView ref={ref}>Element {inView.toString()}</ScrollView> */}
        </Div>
    );
};

export default Detail;