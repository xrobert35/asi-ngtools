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
  selector: '[asiOptionDef]',
})
export class AsiComponentTemplateOptionDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiTagDef]',
})
export class AsiComponentTemplateTagDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiSelectedDef]',
})
export class AsiComponentTemplateSelectedDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiEmptyDef]',
})
export class AsiComponentTemplateEmptyDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiTableHeaderDef]',
})
export class AsiComponentTemplateTableHeaderDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiTabHeaderDef]',
})
export class AsiComponentTemplateTabHeaderDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiNavHeaderDef]',
})
export class AsiComponentTemplateNavHeaderDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiCollapseHeaderDef]',
})
export class AsiComponentTemplateCollapseHeaderDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiCellDef]',
})
export class AsiComponentTemplateCellDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiColumnDef]',
})
export class AsiComponentTemplateColumnDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiTreeNodeDef]',
})
export class AsiComponentTemplateTreeNodeDef {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[asiTreeLeafDef]',
})
export class AsiComponentTemplateTreeLeafDef {
  constructor(public template: TemplateRef<any>) {
  }
}

