import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';


type Language = 'de' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: Language = 'en';
  allowedLanguages: Language[] = ['de', 'en'];


  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {
  }

  isLanguage(language: string): language is Language {
    return this.allowedLanguages.includes(language as Language);
  }
  initLanguage(): void {
    this.translateService.addLangs(['en', 'de']);
    const languages = navigator.languages;
    for (let language of languages) {
      language = language.split('-')[0];
      if (this.isLanguage(language)) {
        this.language = language;
        break;
      }
    }
    this.translateService.setDefaultLang(this.language);
    // Change the URL without navigate:
    this.location.go(this.language);
  }

  changeLanguage(language: Language): void {
    this.translateService.setDefaultLang(language);
    this.location.go(language);
    this.language = language;
  }
}
