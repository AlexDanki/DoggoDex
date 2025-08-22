
import {useState, FormEvent, useEffect} from "react"

import style from './style.module.css'
import doggoDexImg from '../../assets/novaPokedexTec.png'
import TecLeftImg from '../../assets/TecLeft.png'
import TecRightImg from '../../assets/TecRight.png'

interface dataProps{
    breed_for: string;
    breed_group: string;
    height: string
    id: string;
    life_span: string;
    name: string;
    origin: string
    reference_image_id: string;
    temperament: string
}



export function Home(){

    const [input, setInput] = useState("Affenpinscher")
    const [pesquisa, setPesquisa] = useState("Affenpinscher")
    const [dataList, setDataList] = useState<dataProps[]>();
    const [fistItem, setFirstItem] = useState<dataProps>()

    useEffect(()=>{
        getData()
        //getImage()
        
    },[pesquisa])

    async function getData(){
        const path= `https://api.thedogapi.com/v1/breeds/search?q=${pesquisa}&x-api-key=live_ED4LvYmiXEuBGEJUVVY8UK5hRIZ4Z2Mwk3Flp2mrrruf49pELZUQNZUeUMePGRU9`
        fetch(path).
        then(response => response.json()).
        then((data:dataProps[])=>{

            const newData =  data.map((item) => {
                const data = {
                    qualquer: "Coisa",
                    ...item
                }
                return data;
            })
            setDataList(newData)
            setFirstItem(newData[0])
            
        })
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        if(input=== null) return;
        console.log(dataList)
        setInput(input)
        setPesquisa(input)
    }

    return(
        <div className='contianer'>
            <form className={style.form} onSubmit={handleSubmit} action="">
                <input 
                onChange={(e)=> setInput(e.target.value)}
                type="text" placeholder='Perquise por raça'/>
                <button type='submit'>Pesquisar</button>
            </form>
            <div className={style.tecs}>
                <div style={{backgroundImage:`url(${TecLeftImg})`}} className={style.tecLeftImg}>
                    <img className={style.image} src={`https://cdn2.thedogapi.com/images/${fistItem?.reference_image_id}.jpg`} alt="" />
                </div>
                <div style={{backgroundImage:`url(${TecRightImg})`}} className={style.tecRightImg}>
                </div>
            </div>
        </div>
    )
}