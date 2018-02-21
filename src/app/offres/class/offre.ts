export class Offre {
    idOffre: number;
    titreOffre: string; datePublication: Date;
    dateDebutPoste: string;
    introduction: string;
    description: string;
    latittude: number; longitude: number;
    rueOffre: string; codePostalOffre: string; villeOffre: string;
    salaireOffre: number; fk_idUser: number;
}
