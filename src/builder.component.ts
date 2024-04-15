import { Component, Input, HostListener, HostBinding, Output, EventEmitter } from "@angular/core"

interface DocusealField {
  name: string,
  type?: string,
  role?: string,
  title?: string,
  description?: string,
  required?: boolean,
  default_value?: string,
}

interface AfterViewInit {
  ngAfterViewInit(): void
}

@Component({
  selector: "docuseal-builder",
  standalone: true,
  template: "",
  styles: []
})

export class DocusealBuilderComponent implements AfterViewInit {
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
  @Input() requiredFields: DocusealField[] = []
  @Input() i18n: object = {}
  @Input() fieldTypes: string[] = []
  @Input() drawFieldType: string = "text"
  @Input() customButton: { title: string, url: string } = { title: "", url: "" }
  @Input() backgroundColor: string = ""
  @Input() sendButtonText: string = ""
  @Input() saveButtonText: string = ""
  @Input() customCss: string = ""

  @Output() onLoad = new EventEmitter<any>()
  @Output() onUpload = new EventEmitter<any>()
  @Output() onSend = new EventEmitter<any>()
  @Output() onSave = new EventEmitter<any>()
  @Output() onChange = new EventEmitter<any>()

  @HostBinding("attr.data-token") get dataToken(): string { return this.token }
  @HostBinding("attr.data-preview") get dataPreview(): boolean { return this.preview }
  @HostBinding("attr.data-language") get dataLanguage(): string { return this.language }
  @HostBinding("attr.data-autosave") get dataAutosave(): boolean { return this.autosave }
  @HostBinding("attr.data-send-button-text") get dataSendButtonText(): string { return this.sendButtonText }
  @HostBinding("attr.data-save-button-text") get dataSaveButtonText(): string { return this.saveButtonText }
  @HostBinding("attr.data-roles") get dataRoles(): string { return this.roles.join(',') }
  @HostBinding("attr.data-field-types") get dataFieldTypes(): string { return this.fieldTypes.join(',') }
  @HostBinding("attr.data-draw-field-type") get dataDrawFieldType(): string { return this.drawFieldType }
  @HostBinding("attr.data-fields") get dataFields(): string { return JSON.stringify(this.fields) }
  @HostBinding("attr.data-required-fields") get dataRequiredFields(): string { return JSON.stringify(this.requiredFields) }
  @HostBinding("attr.data-i18n") get dataI18n(): string { return JSON.stringify(this.i18n) }
  @HostBinding("attr.data-custom-button-title") get dataCustomButtonTitle(): string { return this.customButton.title }
  @HostBinding("attr.data-custom-button-url") get dataCustomButtonUrl(): string { return this.customButton.url }
  @HostBinding("attr.data-with-recipients-button") get dataWithRecipientsButton(): boolean { return this.withRecipientsButton }
  @HostBinding("attr.data-with-send-button") get dataWithSendButton(): boolean { return this.withSendButton }
  @HostBinding("attr.data-with-documents-list") get dataWithDocumentsList(): boolean { return this.withDocumentsList }
  @HostBinding("attr.data-with-fields-list") get dataWithFieldsList(): boolean { return this.withFieldsList }
  @HostBinding("attr.data-with-title") get dataWithTitle(): boolean { return this.withTitle }
  @HostBinding("attr.data-only-defined-fields") get dataOnlyDefinedFields(): boolean { return this.onlyDefinedFields }
  @HostBinding("attr.data-with-upload-button") get dataWithUploadButton(): boolean { return this.withUploadButton }
  @HostBinding("attr.data-with-sign-yourself-button") get dataWithSignYourselfButton(): boolean { return this.withSignYourselfButton }
  @HostBinding("attr.data-background-color") get dataBackgroundColor(): string { return this.backgroundColor }
  @HostBinding("attr.data-custom-css") get dataCustomCss(): string { return this.customCss }

  ngAfterViewInit(): void {
    this.loadScript()
  }

  @HostListener('send', ['$event'])
  onSendEvent(event: CustomEvent): void {
    if (this.onSend) {
      this.onSend.emit(event.detail)
    }
  }

  @HostListener('load', ['$event'])
  onLoadEvent(event: CustomEvent): void {
    if (this.onLoad) {
      this.onLoad.emit(event.detail)
    }
  }

  @HostListener('upload', ['$event'])
  onUploadEvent(event: CustomEvent): void {
    if (this.onUpload) {
      this.onUpload.emit(event.detail)
    }
  }

  @HostListener('save', ['$event'])
  onSaveEvent(event: CustomEvent): void {
    if (this.onSave) {
      this.onSave.emit(event.detail)
    }
  }

  @HostListener('change', ['$event'])
  onChangeEvent(event: CustomEvent): void {
    if (this.onChange) {
      this.onChange.emit(event.detail)
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
