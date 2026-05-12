import { Component, Input, HostListener, HostBinding, Output, EventEmitter } from "@angular/core"

export type DocusealBuilderField = {
  name: string,
  type?: string,
  role?: string,
  title?: string,
  description?: string,
  required?: boolean,
  default_value?: string,
  width?: number,
  height?: number,
  options?: string[],
  preferences?: {
    font_size?: number,
    font_type?: "bold" | "italic" | "bold_italic",
    mask?: boolean | number,
    font?: "Times" | "Helvetica" | "Courier",
    color?: "black" | "white" | "blue",
    align?: "left" | "center" | "right",
    valign?: "top" | "center" | "bottom",
    format?: string,
    price?: number,
    with_signature_id?: boolean,
    currency?: "USD" | "EUR" | "GBP" | "CAD" | "AUD",
  },
  validation?: {
    pattern?: string,
    message?: string,
    min?: number | string,
    max?: number | string,
    step?: number
  }
}

export type DocusealBuilderSubmitter = {
  email?: string,
  role?: string,
  name?: string,
  phone?: string,
}

export type DocusealBuilderSendData = {
  id: number,
  created_at: string,
  archived_at: string | null,
  template_submitters: Array<{
    name: string,
    uuid: string,
    is_requester?: boolean,
    linked_to_uuid?: string | null,
    order?: number,
    invite_via_field_uuid?: string | null,
    optional_invite_by_uuid?: string | null,
    invite_by_uuid?: string | null,
    email?: string,
  }>,
  template: {
    id: number,
    name: string,
    external_id: string | null,
    created_at: string,
  },
  submitters: Array<{
    id: number,
    uuid: string,
    email: string,
    completed_at: string | null,
    opened_at: string | null,
    sent_at: string | null,
    status_event_at: string,
    status: string,
  }>,
}

type DocusealBuilderTemplateData = {
  id: number,
  author_id: number,
  folder_id: number | null,
  external_id: string | null,
  name: string,
  slug: string,
  source: string | null,
  archived_at: string | null,
  created_at: string,
  updated_at: string,
  shared_link: boolean,
  preferences: Record<string, unknown> | null,
  variables_schema: Record<string, unknown> | null,
  schema: Array<{
    attachment_uuid: string,
    name: string,
    google_drive_file_id?: string,
    dynamic?: boolean,
    conditions?: Array<{
      field_uuid: string,
      value: string,
      action: string,
      operation: string,
    }>,
  }>,
  fields: Array<{
    uuid: string,
    submitter_uuid: string,
    name: string,
    type: string,
    required: boolean,
    readonly?: boolean,
    default_value?: string | string[] | null,
    title?: string,
    description?: string,
    prefillable?: boolean,
    preferences?: Record<string, unknown>,
    options?: Array<{ value: string, uuid: string }>,
    validation?: {
      message?: string,
      pattern?: string,
      min?: number,
      max?: number,
      step?: number,
    },
    conditions?: Array<{
      field_uuid: string,
      value: string,
      action: string,
      operation: string,
    }>,
    areas?: Array<{
      uuid: string,
      x: number,
      y: number,
      w: number,
      h: number,
      cell_w?: number,
      attachment_uuid: string,
      option_uuid?: string,
      page: number,
    }>,
  }>,
  submitters: Array<{
    name: string,
    uuid: string,
    is_requester?: boolean,
    linked_to_uuid?: string | null,
    order?: number,
    invite_via_field_uuid?: string | null,
    optional_invite_by_uuid?: string | null,
    invite_by_uuid?: string | null,
    email?: string,
  }>,
}

export type DocusealBuilderLoadData = DocusealBuilderTemplateData
export type DocusealBuilderUploadData = DocusealBuilderTemplateData
export type DocusealBuilderSaveData = DocusealBuilderTemplateData
export type DocusealBuilderChangeData = DocusealBuilderTemplateData

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
  @Input() host: string = "cdn.docuseal.com"
  @Input() language: string = "en"
  @Input() preview: boolean = false
  @Input() previewMode: boolean = false
  @Input() inputMode: boolean = false
  @Input() autosave: boolean = true
  @Input() withRecipientsButton: boolean = true
  @Input() withDocumentsList: boolean = true
  @Input() withDynamicDocuments: boolean = false
  @Input() withSignatureId: boolean | null = null
  @Input() withFieldsList: boolean = true
  @Input() withFieldsDetection: boolean = false
  @Input() withFieldPlaceholder: boolean = false
  @Input() withSendButton: boolean = true
  @Input() withTitle: boolean = true
  @Input() withPrefillable: boolean = false
  @Input() withRevisions: boolean = false
  @Input() withCustomFieldsTab: boolean = false
  @Input() onlyDefinedFields: boolean = false
  @Input() withSignYourselfButton: boolean = true
  @Input() withUploadButton: boolean = true
  @Input() withAddPageButton: boolean = false
  @Input() roles: string[] = []
  @Input() fields: DocusealBuilderField[] = []
  @Input() submitters: DocusealBuilderSubmitter[] = []
  @Input() requiredFields: DocusealBuilderField[] = []
  @Input() i18n: object = {}
  @Input() fieldTypes: string[] = []
  @Input() dateFormats: string[] = []
  @Input() drawFieldType: string = "text"
  @Input() customButton: { title: string, url: string } = { title: "", url: "" }
  @Input() emailMessage: { subject: string, body: string } = { subject: "", body: "" }
  @Input() backgroundColor: string = ""
  @Input() sendButtonText: string = ""
  @Input() saveButtonText: string = ""
  @Input() customCss: string = ""

  @Output() onLoad = new EventEmitter<DocusealBuilderLoadData>()
  @Output() onUpload = new EventEmitter<DocusealBuilderUploadData>()
  @Output() onSend = new EventEmitter<DocusealBuilderSendData>()
  @Output() onSave = new EventEmitter<DocusealBuilderSaveData>()
  @Output() onChange = new EventEmitter<DocusealBuilderChangeData>()

  @HostBinding("attr.data-token") get dataToken(): string { return this.token }
  @HostBinding("attr.data-preview") get dataPreview(): boolean { return this.preview || this.previewMode }
  @HostBinding("attr.data-input-mode") get dataInputMode(): boolean { return this.inputMode }
  @HostBinding("attr.data-language") get dataLanguage(): string { return this.language }
  @HostBinding("attr.data-autosave") get dataAutosave(): boolean { return this.autosave }
  @HostBinding("attr.data-send-button-text") get dataSendButtonText(): string { return this.sendButtonText }
  @HostBinding("attr.data-save-button-text") get dataSaveButtonText(): string { return this.saveButtonText }
  @HostBinding("attr.data-roles") get dataRoles(): string { return this.roles.join(',') }
  @HostBinding("attr.data-field-types") get dataFieldTypes(): string { return this.fieldTypes.join(',') }
  @HostBinding("attr.data-draw-field-type") get dataDrawFieldType(): string { return this.drawFieldType }
  @HostBinding("attr.data-fields") get dataFields(): string { return JSON.stringify(this.fields) }
  @HostBinding("attr.data-submitters") get dataSubmitters(): string { return JSON.stringify(this.submitters) }
  @HostBinding("attr.data-required-fields") get dataRequiredFields(): string { return JSON.stringify(this.requiredFields) }
  @HostBinding("attr.data-date-formats") get dataDateFormats(): string { return this.dateFormats.join(',') }
  @HostBinding("attr.data-i18n") get dataI18n(): string { return JSON.stringify(this.i18n) }
  @HostBinding("attr.data-custom-button-title") get dataCustomButtonTitle(): string { return this.customButton.title }
  @HostBinding("attr.data-custom-button-url") get dataCustomButtonUrl(): string { return this.customButton.url }
  @HostBinding("attr.data-email-subject") get dataEmailMessageSubject(): string { return this.emailMessage.subject }
  @HostBinding("attr.data-email-body") get dataEmailMessageBody(): string { return this.emailMessage.body }
  @HostBinding("attr.data-with-recipients-button") get dataWithRecipientsButton(): boolean { return this.withRecipientsButton }
  @HostBinding("attr.data-with-send-button") get dataWithSendButton(): boolean { return this.withSendButton }
  @HostBinding("attr.data-with-documents-list") get dataWithDocumentsList(): boolean { return this.withDocumentsList }
  @HostBinding("attr.data-with-dynamic-documents") get dataWithDynamicDocuments(): boolean { return this.withDynamicDocuments }
  @HostBinding("attr.data-with-fields-list") get dataWithFieldsList(): boolean { return this.withFieldsList }
  @HostBinding("attr.data-with-fields-detection") get dataWithFieldsDetection(): boolean { return this.withFieldsDetection }
  @HostBinding("attr.data-with-signature-id") get dataWithSignatureId(): boolean | null { return this.withSignatureId }
  @HostBinding("attr.data-with-field-placeholder") get dataWithFieldPlaceholder(): boolean { return this.withFieldPlaceholder }
  @HostBinding("attr.data-with-prefillable") get dataWithPrefillable(): boolean { return this.withPrefillable }
  @HostBinding("attr.data-with-revisions") get dataWithRevisions(): boolean { return this.withRevisions }
  @HostBinding("attr.data-with-custom-fields-tab") get dataWithCustomFieldsTab(): boolean { return this.withCustomFieldsTab }
  @HostBinding("attr.data-with-title") get dataWithTitle(): boolean { return this.withTitle }
  @HostBinding("attr.data-only-defined-fields") get dataOnlyDefinedFields(): boolean { return this.onlyDefinedFields }
  @HostBinding("attr.data-with-upload-button") get dataWithUploadButton(): boolean { return this.withUploadButton }
  @HostBinding("attr.data-with-add-page-button") get dataWithAddPageButton(): boolean { return this.withAddPageButton }
  @HostBinding("attr.data-with-sign-yourself-button") get dataWithSignYourselfButton(): boolean { return this.withSignYourselfButton }
  @HostBinding("attr.data-background-color") get dataBackgroundColor(): string { return this.backgroundColor }
  @HostBinding("attr.data-custom-css") get dataCustomCss(): string { return this.customCss }

  ngAfterViewInit(): void {
    this.loadScript()
  }

  @HostListener('send', ['$event'])
  onSendEvent(event: Event): void {
    if (this.onSend) {
      this.onSend.emit((event as CustomEvent).detail)
    }
  }

  @HostListener('load', ['$event'])
  onLoadEvent(event: Event): void {
    if (this.onLoad) {
      this.onLoad.emit((event as CustomEvent).detail)
    }
  }

  @HostListener('upload', ['$event'])
  onUploadEvent(event: Event): void {
    if (this.onUpload) {
      this.onUpload.emit((event as CustomEvent).detail)
    }
  }

  @HostListener('save', ['$event'])
  onSaveEvent(event: Event): void {
    if (this.onSave) {
      this.onSave.emit((event as CustomEvent).detail)
    }
  }

  @HostListener('change', ['$event'])
  onChangeEvent(event: Event): void {
    if (this.onChange) {
      this.onChange.emit((event as CustomEvent).detail)
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
