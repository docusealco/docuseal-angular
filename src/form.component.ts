import { Component, Input, HostListener, HostBinding, Output, EventEmitter } from "@angular/core"

interface DocusealField {
  name: string,
  title?: string,
  type?: string,
  position?: number,
  required?: boolean,
}

interface AfterViewInit {
  ngAfterViewInit(): void
}

@Component({
  selector: "docuseal-form",
  standalone: true,
  template: "",
  styles: []
})

export class DocusealFormComponent implements AfterViewInit {
  @Input() src: string = ""
  @Input() host: string = "cdn.docuseal.co"
  @Input() role: string = ""
  @Input() submitter: string = "" // Backward compatibility
  @Input() expand: boolean = true
  @Input() preview: boolean = false
  @Input() email: string = ""
  @Input() applicationKey: string = ""
  @Input() externalId: string = ""
  @Input() backgroundColor: string = ""
  @Input() logo: string = ""
  @Input() language: string = ""
  @Input() completedRedirectUrl: string = ""
  @Input() completedButton: { title: string, url: string } = { title: "", url: "" }
  @Input() goToLast: boolean = true
  @Input() skipFields: boolean = false
  @Input() autoscrollFields: boolean = true
  @Input() withTitle: boolean = true
  @Input() withFieldNames: boolean = true
  @Input() withDownloadButton: boolean = true
  @Input() withSendCopyButton: boolean = true
  @Input() allowToResubmit: boolean = true
  @Input() allowTypedSignature: boolean = true
  @Input() signature: string = ""
  @Input() rememberSignature: boolean = false
  @Input() sendCopyEmail: boolean | null = null
  @Input() values: object = {}
  @Input() metadata: object = {}
  @Input() i18n: object = {}
  @Input() fields: DocusealField[] = []
  @Input() readonlyFields: string[] = []
  @Input() customCss: string = ""

  @Output() onComplete = new EventEmitter<any>()
  @Output() onInit = new EventEmitter<any>()
  @Output() onLoad = new EventEmitter<any>()


  @HostBinding("attr.data-src") get dataSrc(): string { return this.src }
  @HostBinding("attr.data-email") get dataEmail(): string { return this.email }
  @HostBinding("attr.data-role") get dataRole(): string { return this.role || this.submitter }
  @HostBinding("attr.data-external-id") get dataExternalId(): string { return this.externalId || this.applicationKey }
  @HostBinding("attr.data-expand") get dataExpand(): boolean { return this.expand }
  @HostBinding("attr.data-preview") get dataPreview(): boolean { return this.preview }
  @HostBinding("attr.data-go-to-last") get dataGoToLast(): boolean { return this.goToLast }
  @HostBinding("attr.data-skip-fields") get dataSkipFields(): boolean { return this.skipFields }
  @HostBinding("attr.data-autoscroll-fields") get dataAutoscrollFields(): boolean { return this.autoscrollFields }
  @HostBinding("attr.data-send-copy-email") get dataSendCopyEmail(): boolean | null { return this.sendCopyEmail }
  @HostBinding("attr.data-with-title") get dataWithTitle(): boolean { return this.withTitle }
  @HostBinding("attr.data-logo") get dataLogo(): string { return this.logo }
  @HostBinding("attr.data-language") get dataLanguage(): string { return this.language }
  @HostBinding("attr.data-with-field-names") get dataWithFieldNames(): boolean { return this.withFieldNames }
  @HostBinding("attr.data-with-download-button") get dataWithDownloadButton(): boolean { return this.withDownloadButton }
  @HostBinding("attr.data-allow-to-resubmit") get dataAllowToResubmit(): boolean { return this.allowToResubmit }
  @HostBinding("attr.data-allow-typed-signature") get dataAllowTypedSignature(): boolean { return this.allowTypedSignature }
  @HostBinding("attr.data-signature") get dataSignature(): string { return this.signature }
  @HostBinding("attr.data-remember-signature") get dataRememberSignature(): boolean { return this.rememberSignature }
  @HostBinding("attr.data-completed-redirect-url") get dataCompletedRedirectUrl(): string { return this.completedRedirectUrl }
  @HostBinding("attr.data-with-send-copy-button") get dataWithSendCopyButton(): boolean { return this.withSendCopyButton }
  @HostBinding("attr.data-values") get dataValues(): string { return JSON.stringify(this.values) }
  @HostBinding("attr.data-metadata") get dataMetadata(): string { return JSON.stringify(this.metadata) }
  @HostBinding("attr.data-fields") get dataFields(): string { return JSON.stringify(this.fields) }
  @HostBinding("attr.data-i18n") get dataI18n(): string { return JSON.stringify(this.i18n) }
  @HostBinding("attr.data-readonly-fields") get dataReadonlyFields(): string { return this.readonlyFields.join(',') }
  @HostBinding("attr.data-completed-button-title") get dataCompletedButtonTitle(): string { return this.completedButton.title }
  @HostBinding("attr.data-completed-button-url") get dataCompletedButtonUrl(): string { return this.completedButton.url }
  @HostBinding("attr.data-background-color") get dataBackgroundColor(): string { return this.backgroundColor }
  @HostBinding("attr.data-custom-css") get dataCustomCss(): string { return this.customCss }

  ngAfterViewInit(): void {
    this.loadScript()
  }

  @HostListener('completed', ['$event'])
  onCompleteEvent(event: CustomEvent): void {
    if (this.onComplete) {
      this.onComplete.emit(event.detail)
    }
  }

  @HostListener('init', ['$event'])
  onInitEvent(event: CustomEvent): void {
    if (this.onInit) {
      this.onInit.emit(event.detail)
    }
  }

  @HostListener('load', ['$event'])
  onLoadEvent(event: CustomEvent): void {
    if (this.onLoad) {
      this.onLoad.emit(event.detail)
    }
  }

  loadScript(): void {
    const scriptId = "docuseal-form-script"
    const scriptSrc = `https://${this.host}/js/form.js`
    const script = document.createElement("script")

    script.id = scriptId
    script.async = true
    script.src = scriptSrc

    document.head.appendChild(script)
  }
}
