export interface Noticia{
    id: string,
    title: string,
    description: string,
    details: string,
    image: string,
    image1: string,
    image2: string,
    image3: string,
    type: string,
    autor: string,
    fecha: Date

}
export interface Usuario{
    uid: string,
    email: string,
    type: string
}

export interface Publicidad{
    id: string,
    image: string,
    type: string,
    fecha: Date
}

