/**
 * interface property to string converter
 * use: let addTodo = action<ITodo>(ADD_CONST)
 */

export function _prop( property: (object: any) => void ) {
  return property
    .toString()
    .match(/[\s\S]*{[\s\S]*\.([^\.; ]*)[ ;\n]*}/)
    [ 1 ]
}


/*
 Example

 interface IClass {
   a: number
   b: {
     c: number
   }
 }

 _prop(( o: IClass ) => o.a )    // a
 _prop(( o: IClass ) => o.b.c )  // c
 */







