
import {useState, FormEvent, useEffect} from "react"

import style from './style.module.css'
import doggoDexImg from '../../assets/novaPokedexTec.png'
import TecLeftImg from '../../assets/TecLeft.png'
import TecRightImg from '../../assets/TecRight.png'

interface dataProps{
    bred_for: string;
    breed_group: string;
    height: {
        imperial: string,
        metric: string
    }
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
        const apiKey = import.meta.env.DOG_API_KEY;
        const path= `https://api.thedogapi.com/v1/breeds/search?q=${pesquisa}&x-api-key=${apiKey}`
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

    function handleFormatString(height: string, char: string){
        const index = Number(height.indexOf(char))

        return height.slice(0, index);
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
                    {
                        fistItem && (
                            <img className={style.image} src={`https://cdn2.thedogapi.com/images/${fistItem?.reference_image_id}.jpg`} alt="" />
                        )

                    }
                    {
                        !fistItem && (<h4 className={style.image}>Sem sinal...</h4>)
                    }
                </div>
                <div style={{backgroundImage:`url(${TecRightImg})`}} className={style.tecRightImg}>
                    <div className={style.info}>
                        {
                            fistItem && (
                                <div>
                                    <h3>Raça: </h3> 
                                    <span>{fistItem?.name}</span>

                                    <h3>Altura:</h3>
                                    <span>{fistItem?.height.metric} cm</span>

                                    <h3>Tempo de vida:</h3>
                                    <span>{fistItem?.life_span}</span>

                                    <h3>Temperamento:</h3>
                                    <span>{fistItem?.temperament}</span>

                                    <h3>Criado para:</h3>
                                    <span>{fistItem?.bred_for}</span>
                                </div>
                            )
                        }
                        {
                            !fistItem && (<h3>Raça não Encontrada, por favor verifique e tente novamente :)</h3>)
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}