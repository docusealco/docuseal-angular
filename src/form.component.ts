import { Component, Input, ElementRef, HostListener, SimpleChanges } from "@angular/core"

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
interface OnChanges {
  ngOnChanges(changes: SimpleChanges): void
}
@Component({
  selector: "docuseal-form",
  standalone: true,
  template: "",
  styles: []
})

export class DocusealFormComponent implements AfterViewInit, OnChanges {
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
  @Input() withTitle: boolean = true
  @Input() withFieldNames: boolean = true
  @Input() withDownloadButton: boolean = true
  @Input() withSendCopyButton: boolean = true
  @Input() allowToResubmit: boolean = true
  @Input() allowTypedSignature: boolean = true
  @Input() sendCopyEmail: boolean = false
  @Input() values: object = {}
  @Input() metadata: object = {}
  @Input() i18n: object = {}
  @Input() fields: DocusealField[] = []
  @Input() readonlyFields: string[] = []
  @Input() onComplete: (detail: any) => void = () => {}
  @Input() onInit: (detail: any) => void = () => {}
  @Input() onLoad: (detail: any) => void = () => {}
  @Input() customCss: string = ""

  constructor(private el: ElementRef) {}

  get attributes (): { [key: string]: any } {
    return {
      src: {
        name: "data-src",
        value: () => this.src
      },
      email: {
        name: "data-email",
        value: () => this.email
      },
      role: {
        name: "data-role",
        value: () => this.role || this.submitter
      },
      externalId: {
        name: "data-external-id",
        value: () => this.externalId || this.applicationKey
      },
      expand: {
        name: "data-expand",
        value: () => this.expand
      },
      preview: {
        name: "data-preview",
        value: () => this.preview
      },
      goToLast: {
        name: "data-go-to-last",
        value: () => this.goToLast
      },
      skipFields: {
        name: "data-skip-fields",
        value: () => this.skipFields
      },
      sendCopyEmail: {
        name: "data-send-copy-email",
        value: () => this.sendCopyEmail
      },
      withTitle: {
        name: "data-with-title",
        value: () => this.withTitle
      },
      logo: {
        name: "data-logo",
        value: () => this.logo
      },
      language: {
        name: "data-language",
        value: () => this.language
      },
      withFieldNames: {
        name: "data-with-field-names",
        value: () => this.withFieldNames
      },
      withDownloadButton: {
        name: "data-with-download-button",
        value: () => this.withDownloadButton
      },
      allowToResubmit: {
        name: "data-allow-to-resubmit",
        value: () => this.allowToResubmit
      },
      allowTypedSignature: {
        name: "data-allow-typed-signature",
        value: () => this.allowTypedSignature
      },
      completedRedirectUrl: {
        name: "data-completed-redirect-url",
        value: () => this.completedRedirectUrl
      },
      withSendCopyButton: {
        name: "data-with-send-copy-button",
        value: () => this.withSendCopyButton
      },
      values: {
        name: "data-values",
        value: () => JSON.stringify(this.values)
      },
      metadata: {
        name: "data-metadata",
        value: () => JSON.stringify(this.metadata)
      },
      fields: {
        name: "data-fields",
        value: () => JSON.stringify(this.fields)
      },
      i18n: {
        name: "data-i18n",
        value: () => JSON.stringify(this.i18n)
      },
      readonlyFields: {
        name: "data-readonly-fields",
        value: () => this.readonlyFields.join(',')
      },
      completedButton: [
        {
          name: "data-completed-button-title",
          value: () => this.completedButton.title
        },
        {
          name: "data-completed-button-url",
          value: () => this.completedButton.url
        }
      ],
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
    const form = this.el.nativeElement;

    Object.entries(this.attributes).forEach(([_, attribute]) => {
      if (Array.isArray(attribute)) {
        attribute.forEach((attr) => {
          form.setAttribute(attr.name, attr.value())
        })
      } else {
        form.setAttribute(attribute.name, attribute.value())
      }
    })

    this.loadScript()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const form = this.el.nativeElement;
    const attributes = this.attributes

    Object.entries(changes).forEach(([key, change]) => {
      const attribute = attributes[key]

      if (Array.isArray(attribute)) {
        attribute.forEach((attr) => {
          form.setAttribute(attr.name, attr.value())
        })
      } else if (attribute) {
        form.setAttribute(attribute.name, change.currentValue)
      }
    })
  }

  @HostListener('completed', ['$event'])
  onCompleteEvent(event: CustomEvent): void {
    if (this.onComplete) {
      this.onComplete(event.detail)
    }
  }

  @HostListener('init', ['$event'])
  onInitEvent(event: CustomEvent): void {
    if (this.onInit) {
      this.onInit(event.detail)
    }
  }

  @HostListener('load', ['$event'])
  onLoadEvent(event: CustomEvent): void {
    if (this.onLoad) {
      this.onLoad(event.detail)
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
