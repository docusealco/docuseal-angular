import { Component, Input, ElementRef, HostListener, SimpleChanges } from "@angular/core"

interface DocusealField {
  name: string,
  type?: string,
  role?: string,
  default_value?: string,
}

interface AfterViewInit {
  ngAfterViewInit(): void
}
interface OnChanges {
  ngOnChanges(changes: SimpleChanges): void
}
@Component({
  selector: "docuseal-builder",
  standalone: true,
  template: "",
  styles: []
})

export class DocusealBuilderComponent implements AfterViewInit, OnChanges {
  @Input() token: string = ""
  @Input() host: string = "cdn.docuseal.co"
  @Input() language: string = "en"
  @Input() preview: boolean = false
  @Input() autosave: boolean = true
  @Input() withRecipientsButton: boolean = true
  @Input() withDocumentsList: boolean = true
  @Input() withFieldsList: boolean = true
  @Input() withSendButton: boolean = true
  @Input() withTitle: boolean = true
  @Input() onlyDefinedFields: boolean = false
  @Input() withSignYourselfButton: boolean = true
  @Input() withUploadButton: boolean = true
  @Input() roles: string[] = []
  @Input() fields: DocusealField[] = []
  @Input() i18n: object = {}
  @Input() fieldTypes: string[] = []
  @Input() drawFieldType: string = "text"
  @Input() customButton: { title: string, url: string } = { title: "", url: "" }
  @Input() backgroundColor: string = ""
  @Input() onLoad: (detail: any) => void = () => {}
  @Input() onUpload: (detail: any) => void = () => {}
  @Input() onSend: (detail: any) => void = () => {}
  @Input() onSave: (detail: any) => void = () => {}
  @Input() sendButtonText: string = ""
  @Input() saveButtonText: string = ""
  @Input() customCss: string = ""

  constructor(private el: ElementRef) {}

  get attributes (): { [key: string]: any } {
    return {
      src: {
        name: "data-token",
        value: () => this.token
      },
      preview: {
        name: "data-preview",
        value: () => this.preview
      },
      language: {
        name: "data-language",
        value: () => this.language
      },
      autosave: {
        name: "data-autosave",
        value: () => this.autosave
      },
      sendButtonText: {
        name: "data-send-button-text",
        value: () => this.sendButtonText
      },
      saveButtonText: {
        name: "data-save-button-text",
        value: () => this.saveButtonText
      },
      roles: {
        name: "data-roles",
        value: () => this.roles.join(',')
      },
      fieldTypes: {
        name: "data-field-types",
        value: () => this.fieldTypes.join(',')
      },
      drawFieldType: {
        name: "data-draw-field-type",
        value: () => this.drawFieldType
      },
      fields: {
        name: "data-fields",
        value: () => JSON.stringify(this.fields)
      },
      i18n: {
        name: "data-i18n",
        value: () => JSON.stringify(this.i18n)
      },
      customButton: [
        {
          name: "data-custom-button-title",
          value: () => this.customButton.title
        },
        {
          name: "data-custom-button-url",
          value: () => this.customButton.url
        }
      ],
      withRecipientsButton: {
        name: "data-with-recipients-button",
        value: () => this.withRecipientsButton
      },
      withSendButton: {
        name: "data-with-send-button",
        value: () => this.withSendButton
      },
      withDocumentsList: {
        name: "data-with-documents-list",
        value: () => this.withDocumentsList
      },
      withFieldsList: {
        name: "data-with-fields-list",
        value: () => this.withFieldsList
      },
      withTitle: {
        name: "data-with-title",
        value: () => this.withTitle
      },
      onlyDefinedFields: {
        name: "data-only-defined-fields",
        value: () => this.onlyDefinedFields
      },
      withUploadButton: {
        name: "data-with-upload-button",
        value: () => this.withUploadButton
      },
      withSignYourselfButton: {
        name: "data-with-sign-yourself-button",
        value: () => this.withSignYourselfButton
      },
      backgroundColor: {
        name: "data-background-color",
        value: () => this.backgroundColor
      },
      customCss: {
        name: "data-custom-css",
        value: () => this.customCss
      }
    }
  }

  ngAfterViewInit(): void {
    const builder = this.el.nativeElement;

    Object.entries(this.attributes).forEach(([_, attribute]) => {
      if (Array.isArray(attribute)) {
        attribute.forEach((attr) => {
          builder.setAttribute(attr.name, attr.value())
        })
      } else if (attribute) {
        builder.setAttribute(attribute.name, attribute.value())
      }
    })

    this.loadScript()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const builder = this.el.nativeElement;
    const attributes = this.attributes

    Object.entries(changes).forEach(([key, change]) => {
      const attribute = attributes[key]

      if (Array.isArray(attribute)) {
        attribute.forEach((attr) => {
          builder.setAttribute(attr.name, attr.value())
        })
      } else if (attribute) {
        builder.setAttribute(attribute.name, change.currentValue)
      }
    })
  }

  @HostListener('send', ['$event'])
  onSendEvent(event: CustomEvent): void {
    if (this.onSend) {
      this.onSend(event.detail)
    }
  }

  @HostListener('load', ['$event'])
  onLoadEvent(event: CustomEvent): void {
    if (this.onLoad) {
      this.onLoad(event.detail)
    }
  }

  @HostListener('upload', ['$event'])
  onUploadEvent(event: CustomEvent): void {
    if (this.onUpload) {
      this.onUpload(event.detail)
    }
  }

  @HostListener('save', ['$event'])
  onSaveEvent(event: CustomEvent): void {
    if (this.onSave) {
      this.onSave(event.detail)
    }
  }

  loadScript(): void {
    const scriptId = 'docuseal-builder-script'
    const scriptSrc = `https://${this.host}/js/builder.js`
    const script = document.createElement("script")

    script.id = scriptId
    script.async = true
    script.src = scriptSrc

    document.head.appendChild(script)
  }
}
