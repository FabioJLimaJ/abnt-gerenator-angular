import { Component, ViewChild, ElementRef } from '@angular/core';
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    HeadingLevel,
    Header,
    PageNumber,
    NumberFormat,
    TabStopType
} from "docx";

import { saveAs } from "file-saver";

@Component({
    selector: 'app-painel-word',
    imports: [],
    templateUrl: './painel-word.html',
    styleUrl: './painel-word.css',
})
export class PainelWord {

    @ViewChild('inputInstituicao') inputInstituicao!: ElementRef<HTMLDivElement>;
    @ViewChild('inputNomeAluno') inputNomeAluno!: ElementRef<HTMLDivElement>;
    @ViewChild('inputTituloTrabalho') inputTituloTrabalho!: ElementRef<HTMLDivElement>;
    @ViewChild('inputCidade') inputCidade!: ElementRef<HTMLDivElement>;
    @ViewChild('inputAno') inputAno!: ElementRef<HTMLDivElement>;
    @ViewChild('inputIntroducao') inputIntroducao!: ElementRef<HTMLDivElement>;
    @ViewChild('inputContext') inputContext!: ElementRef<HTMLDivElement>;

    gerar() {

        const instituicao = this.inputInstituicao.nativeElement.innerText;
        const nomeAluno = this.inputNomeAluno.nativeElement.innerText;
        const tituloTrabalho = this.inputTituloTrabalho.nativeElement.innerText;
        const cidade = this.inputCidade.nativeElement.innerText;
        const ano = this.inputAno.nativeElement.innerText;
        const introducao = this.inputIntroducao.nativeElement.innerText;
        const context = this.inputContext.nativeElement.innerText;

        const doc = new Document({

            styles: {
                default: {
                    document: {
                        run: {
                            font: "Arial",
                            size: 24,
                            color: "000000",
                        },
                        paragraph: { spacing: { line: 360 }, }// espaçamento 1,5
                    }
                }
            },

            sections: [

                {
                    properties: {
                        page: {
                            margin: { top: "3cm", right: "2cm", bottom: "2cm", left: "3cm" }
                        }
                    },

                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({ text: instituicao, bold: true }),
                                new TextRun({ text: "\n" + nomeAluno, bold: true, break: 3 }),
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 4000 },
                            children: [
                                new TextRun({ text: tituloTrabalho, bold: true, size: 32 }),
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 6000 },
                            children: [
                                new TextRun({ text: cidade, bold: true }),
                                new TextRun({ text: "\n" + ano, bold: true, break: 1 }),
                            ]
                        }),
                    ]
                },

                {
                    properties: {
                        page: {
                            margin: { top: "3cm", right: "2cm", bottom: "2cm", left: "3cm" }
                        }
                    },
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({ text: "\n" + nomeAluno, bold: true }),
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 5000 },
                            children: [
                                new TextRun({ text: tituloTrabalho, bold: true, size: 32 }),
                            ]
                        }),

                        new Paragraph({
                            alignment: AlignmentType.JUSTIFIED,
                            indent: { left: 5103 },
                            spacing: { before: 1500 },
                            children: [
                                new TextRun({ text: "Trabalho acadêmico apresentado à disciplina de [Nome] como requisito para aprovação no curso de [Curso].", size: 20 })
                            ]
                        }),

                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 3000 },
                            children: [
                                new TextRun({ text: cidade, bold: true }),
                                new TextRun({ text: "\n" + ano, bold: true, break: 1 }),
                            ]
                        }),
                    ]
                },




                {
                    properties: {
                        page: {
                            margin: { top: "3cm", right: "2cm", bottom: "2cm", left: "3cm" },
                        }
                    },
                    children: [
                        new Paragraph({
                            text: "SUMÁRIO",
                            alignment: AlignmentType.CENTER,
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 400 },
                        }),

                        new Paragraph({
                            tabStops: [
        {
            type: TabStopType.RIGHT,
            position: 9000, // Alinha o número na margem direita
            leader: TabStopLeader.DOT, // Cria os pontinhos .......
        },
    ],
    children: [
        new TextRun({ text: "1 INTRODUÇÃO", bold: true }),
        new TextRun({ text: "\t4" }), // \t ativa os pontinhos, 4 é a página
    ],
                    ]
                },

                {
                    properties: {
                        page: {
                            margin: { top: "3cm", right: "2cm", bottom: "2cm", left: "3cm" },
                            pageNumbers: { start: 2 }
                        }
                    },
                    headers: {
                        default: new Header({
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new TextRun({
                                            children: [PageNumber.CURRENT],
                                            size: 20,
                                        })
                                    ]
                                })
                            ]
                        })
                    },
                    children: [
                        new Paragraph({
                            text: introducao.toUpperCase(),
                            heading: HeadingLevel.HEADING_1,
                            alignment: AlignmentType.LEFT,
                        }),
                        new Paragraph({
                            alignment: AlignmentType.JUSTIFIED,
                            indent: { firstLine: 709 },
                            children: [
                                new TextRun({ text: context })
                            ]
                        })
                    ]
                }
            ]
        })

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, 'documento-abnt.docx');
        }

        );


        console.log("Documento gerado com sucesso!");


    }

}
