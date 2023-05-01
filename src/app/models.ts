export interface Noticia{
    id: string,
    title: string,
    description: string,
    details: string,
    image: string,
    au_im: string,
    image1: string,
    au_im1: string,
    image2: string,
    au_im2: string,
    image3: string,
    au_im3: string,
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

