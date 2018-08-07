import { Directive, TemplateRef, Component } from '@angular/core';

@Component({
  selector: 'asi-option, asi-tag, asi-selected, asi-empty, asi-header, asi-cell, asi-tree-node, asi-tree-leaf',
  template: '<ng-content></ng-content>'
})
export class AsiComponentTemplate {
  constructor() {
  }
}

// ############# OPTION  #############
@Directive({
  selector: '[optionDef]',
})
export class AsiComponentTemplateOptionDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[tagDef]',
})
export class AsiComponentTemplateTagDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[selectedDef]',
})
export class AsiComponentTemplateSelectedDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[emptyDef]',
})
export class AsiComponentTemplateEmptyDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[tableHeaderDef]',
})
export class AsiComponentTemplateTableHeaderDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[tabHeaderDef]',
})
export class AsiComponentTemplateTabHeaderDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[collapseHeaderDef]',
})
export class AsiComponentTemplateCollapseHeaderDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[cellDef]',
})
export class AsiComponentTemplateCellDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[columnDef]',
})
export class AsiComponentTemplateColumnDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[treeNodeDef]',
})
export class AsiComponentTemplateTreeNodeDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[treeLeafDef]',
})
export class AsiComponentTemplateTreeLeafDef {
  constructor(public template: TemplateRef<any>) {
  }
}

