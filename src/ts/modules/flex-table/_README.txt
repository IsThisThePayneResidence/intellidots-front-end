Система flex-table модуля.
Компоненты используются иерархически.
При этом можно полноценно использовать компонент - взятый из любой цепочки иерархии.

Назначения компонентов и примеры:

Cell - ячейка. Позволяет настроить форматирование данных в конкретной колонке.
    Принимает текущий элемент данных и колонку

HeadCell - ячейка заголовка.
    Принимает ...Cell + информацию о сортировке
    Оповещает о событии сортировки onSortChange()

FTable - таблица. Елементарное отображение таблицы.
    Принимает описание колонок, список отображаемых данных

FlexTable - обёртка для FTable, с фильтрацией, пагинацией, суммарной информацией.
    Принимает настройки соответстующих комплектующих
    Оповещает о всех событиях своих компонентов


FlexTableHandler - является изолированой обёрткой для FlexTable (для работы с фильтром сортировкой без API).
    Принимает ...FTable, может принимать дэфолтные значение фильтра и сортировки
    Может оповещать о измении фильтра, сортировки, даты, в масштабе готовых данных (для сохранения)

FlexTableTrigger - является откытой обёрткой для FlexTable (обработка подразумевается свыше, например в редюсерах или в API).
   Принимает ...FlexTable
   Оповещает о всех внутрених событиях, +(onFilter, onSort) - события с стандартно собранным фильтром\сортировкой



Примеры использования компонентов в папке examples

console.log(