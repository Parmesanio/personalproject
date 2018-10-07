import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux';
import { createProduct, editProduct} from '../../redux/productReducer';
import { withRouter } from 'react-router-dom';
import './forms.css'
const CLOUDINARY_UPLOAD_PRESET = 'talkinmonkeysproject',
      CLOUDINARY_UPLOAD_URL    = 'https://api.cloudinary.com/v1_1/parmesanio/upload';
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            price: 0,
            product_url: '',
            sizes: '',
            dimensions: {},
            description: '',
            in_stock: true,
            uploadedFileCloudinaryUrl: '',
            uploadedFiles: []
         }
         this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        let currentProduct = {};
        this.props.match.params.id &&(
        currentProduct = this.props.productList.find(item => item.id == this.props.match.params.id)
        )
        console.log(currentProduct, this.props.productList);
        
        this.setState({
            name: currentProduct.name,
            price: currentProduct.price,
            product_url: currentProduct.product_url,
            sizes: currentProduct.sizes,
            dimensions: currentProduct.dimensions,
            description: currentProduct.description,
            in_stock: currentProduct.in_stock,
        })
    }
    onImageDrop(files) {
        console.log(files);
        
        this.setState({
          uploadedFiles: files
        });
    
        this.handleImageUpload(files);
      }
      handleImageUpload(file) {
          console.log('handleImageUpload', file);
          
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
                            console.log(upload);
                            
    
        upload.end((err, response) => {
            console.log(response);
            
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url,
              product_url: response.body.secure_url
            });
          }
        });
      }
      handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(event) {
        event.preventDefault();
    }
    render() {
        let { name, price, product_url, sizes, dimensions, description, in_stock, uploadedFiles } = this.state
        let { admin, createProduct, editProduct, productList } = this.props;
        let { id } = this.props.match.params;

        let mappedCloudPhotos = uploadedFiles.map(file => {
            return <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
            <p>{file.name}</p>
            </div>}
        </div>
        })
        
        return ( 
            <div className="forms">
            {admin.name ? this.props.match.params.id ? 
            <div>
                <h1>Edit Product</h1>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label>Name:</label>
                    <input name="name" onChange={(event) => this.handleChange(event)} type="text" value={name} />
                    <label>Price:</label>
                    <input name="price" onChange={(event) => this.handleChange(event)} type="text" value={price} />
                    <label>Sizes:</label>
                    <input name="sizes" onChange={(event) => this.handleChange(event)} type="text" value={sizes} />
                    <label>Dimensions:</label>
                    <textarea name="dimensions" onChange={(event) => this.handleChange(event)} type="text" value={dimensions}></textarea>
                    <label>Description:</label>
                    <input name="description" onChange={(event) => this.handleChange(event)} type="text" value={description} />
                    <label>Product Photo:</label>
                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                    {mappedCloudPhotos}
                    <label>Photo URLs Appear Below</label>
                    <textarea name="product_url" onChange={(event) => this.handleChange(event)} type="text" value={product_url || ''} />
                    <button onClick={() => editProduct(id, name, price, product_url, sizes, dimensions, description, in_stock)}>Edit Product</button>
                </form>
            </div>
            :
            <div>
            <h1>Create Product</h1>
            <form onSubmit={(event) => this.onSubmit(event)}>
                <label>Name:</label>
                <input name="name" onChange={(event) => this.handleChange(event)} type="text" placeholder="Name..."  />
                <label>Price:</label>
                <input name="price" onChange={(event) => this.handleChange(event)} type="text" placeholder="Price..." />
                <label>Sizes:</label>
                <input name="sizes" onChange={(event) => this.handleChange(event)} type="text" placeholder="Sizes..." />
                <label>Dimensions:</label>
                <input name="dimensions" onChange={(event) => this.handleChange(event)} type="text" placeholder="Dimensions..." />
                <label>Description:</label>
                <textarea name="description" onChange={(event) => this.handleChange(event)} type="text" placeholder="Description..." />
                <label>Product Photo:</label>
                <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}>
                    <p>Drop an image or click to select a file to upload.</p>
                </Dropzone>
                {mappedCloudPhotos}
                <label>Photo URLs Appear Below</label>
                <textarea name="product_url" onChange={(event) => this.handleChange(event)} type="text" value={product_url || ''} />
                <button onClick={() => createProduct(name, price, product_url, sizes, dimensions, description, in_stock = true, admin.id)}>Create Product</button>
            </form>
        </div>
            :
            <p>Log in to view this page</p>}
            </div>
         );
    }
}

const mapStateToProps = state => {
    let { admin } = state.primates;
    let { productList } = state.products;

    return {
        admin,
        productList
    }
}
 
export default connect(mapStateToProps, {createProduct, editProduct})(withRouter(Create));