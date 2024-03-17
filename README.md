# DocuSeal Angular Components

This package provides a convenient way to embed [DocuSeal](https://www.docuseal.co) into Angular apps. Sign documents and create document forms directly in your apps.

![Docuseal Form](https://github.com/docusealco/docuseal-vue/assets/1176367/828f9f53-3131-494c-8e37-5c74fa94cfa8)

## Installation

```bash
npm install @docuseal/angular
```

## Documentation

For detailed documentation, please click [here](https://www.docuseal.co/docs/embedded).

## Usage

### Signing Form

Copy public DocuSeal form URL from [https://docuseal.co](https://docuseal.co) and use it in the `src` component prop:

```typescript
import { Component, } from '@angular/core';
import { DocusealFormComponent } from '@docuseal/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocusealFormComponent],
  template: `
    <div class="app">
      <docuseal-form
        src="https://docuseal.co/d/LEVGR9rhZYf86M"
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
