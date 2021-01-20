import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
// import { SelectCategoryProvider } from "../../providers/select_category/select_category";
// import { LanguagesProvider } from "../../providers/languages/languages";
import { Constants } from "../../app/app.constants";
import { CategoriesProvider } from "../../providers/categories/categories";

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-popover",
  templateUrl: "popover.html",
  // providers: [SelectCategoryProvider, LanguagesProvider]
})
export class PopoverPage {
  categories: any = [];
  filterSelected: any;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    public categoryProvider: CategoriesProvider
    // public languagesProvider: LanguagesProvider,
    // private selectCategoryProvider: SelectCategoryProvider
  ) {

    console.log('Hello FilterPopoverComponent Component');
    this.filterSelected = navParams.get('filterSelected');
    console.log('this.filterSelected ', this.filterSelected);
    this.getCategories();

    
  }

  getCategories(){
    this.categoryProvider.getCategories().then(res => {
      this.categories = res.data;
        console.log("categories", this.categories);
        if (this.filterSelected) {
          this.markSelected();
        }
      })
  }


  close(data) {
    this.viewCtrl.dismiss(data);
  }

  markSelected() {
    this.categories.forEach(element => {
      console.log('element -----', element)
      element.selected = false;
      if (element.id == this.filterSelected.id) {
        element.selected = true;
      }
      
    });
    
  }
}

