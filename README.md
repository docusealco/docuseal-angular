# DocuSeal Angular Components

[📙 Documentation](https://www.docuseal.com/docs/embedded/form#angular) | [💻 Examples](https://github.com/docusealco/docuseal-angular-examples) | [🚀 Demo App](https://embed.docuseal.tech/)

This package provides a convenient way to embed [DocuSeal](https://www.docuseal.com) into Angular apps. Sign documents and create document forms directly in your apps.

[Embedded Signing Form](#signing-form) 

![Signing Form](https://github.com/user-attachments/assets/5c92b842-7687-4341-88a1-64ac26c1e2e0)

[Embedded Form Builder](#form-builder) 

![Form Builder](https://github.com/user-attachments/assets/7645a4fb-7399-4cce-bb90-e077a8a1ce95)

## Installation

```bash
npm install @docuseal/angular
```

## Documentation

For detailed documentation, please click [here](https://www.docuseal.com/docs/embedded).

## Usage

### Signing Form

Copy public DocuSeal form URL from [https://docuseal.com](https://docuseal.com) and use it in the `src` component prop:

```typescript
import { Component } from '@angular/core';
import { DocusealFormComponent } from '@docuseal/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocusealFormComponent],
  template: `
    <div class="app">
      <docuseal-form
        src="https://docuseal.com/d/LEVGR9rhZYf86M"
        email="signer@example.com">
      </docuseal-form>
    </div>
  `
})
export class AppComponent {}
```

### Form Builder
```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocusealBuilderComponent } from '@docuseal/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocusealBuilderComponent],
  template: `
    <div class="app">
      <ng-container *ngIf="token">
        <docuseal-builder [token]="token"></docuseal-builder>
      </ng-container>
    </div>
  `
})
export class AppComponent implements OnInit {
  token: string = ''

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.post('/api/docuseal/builder_token', {}).subscribe((data: any) => {
      this.token = data.token;
    });
  }
}
```

# License

MIT
