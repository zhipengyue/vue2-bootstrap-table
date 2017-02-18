# vue2-bootstrap-table
bootstrap table with vue 2.0

> A Vue.js project

## update and add some function
```
[{"id": 0,"name": "MJ.JK","email": "121585219@qq.com","address": {
    "id": 1,
    "user_id": "1",
    "line1": "244 Webster Flats Suite 758\nPatrickville, AL 42356",
    "line2": "Ecuador",
    "zipcode": "68886",
    "mobile": "1-187-739-6732x0538",
    "fax": "317-398-7451x27805"
}}]
```
Your json code maybe like that. And your want make a table to display it.
the vue2-bootstrap-table plugin is good one choice.
but when i read the source code,i found if i whant to display some infomation in the address,it's not supported.
so, i add two function in src/utils/filterBy.
now ,you can display the address columns in this way ;

```
columns.push({
    title: 'address',
    field: 'address|line1',
    visible: true,
    sortable: false
})
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
