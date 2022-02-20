import React, {useState} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios'
import { fetchUser } from '../../store/userInfoSlice'
import { makeStyles } from '@mui/styles';
import { Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    Crop:{
        position: 'fixed',
        inset: 0,
        top:'2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
       
    },
    CropGrid:{
        
        backgroundColor:'#fff',
        padding: '0.7rem',
        borderRadius: '0.3rem',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 8px',
        objectFit:'cover'
    },
    CropImageSec:{
       align: 'center',
       justifyContent: 'center',
    },
    CropImage:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ReactCrop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img':{
            width:'100%',
            height:'100%',
        }
    },
    
    CropButtons: {
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',

       '& button':{
           marginRight:'0.4rem'
       }
       
    }


}))

function CropImage(props) {

    const classes = useStyles();
    const theme = useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));
    const token = useSelector((state) => state.userInfo.token);
    const dispatch= useDispatch();
    const [srcImg, setsrcImg] = useState(null);
    const [crop, setcrop] = useState({
        unit: 'px',
        width: 170,
        aspect: 1/1
    })
    const [imageRef, setimageRef] = useState(null)
    const [croppedImageUrl, setcroppedImageUrl] = useState();

    const onSelectFile= (e)=> {
        if (e.target.files && e.target.files.length > 0)
        {
          const maxSize = 1024 * 1024;
          const imageFile =e.target.files[0];
          console.log('loaded image', imageFile);
          if (imageFile.size > maxSize) {
            alert('Please select a image less than 1 MB size');
            
          }
          else{
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setsrcImg(reader.result);

                console.log("reader",reader.result);
                console.log("src Image",srcImg);
            });
            reader.readAsDataURL(imageFile);
          }
          
        }
    }

    const onImageLoaded =(image)=> {
        setimageRef(image);
    }

    const onCropComplete=(crop)=> {
        makeClientCrop(crop);
    }

    const onCropChange=(crop, percentCrop)=> {
        console.log("crop", crop, percentCrop);
        setcrop(crop);
    }

    
  const makeClientCrop= async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImgUrl = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg'
      );
      setcroppedImageUrl(croppedImgUrl);
      console.log('Final Url: ', croppedImageUrl);
    }
  }

  
 const getCroppedImg= (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(srcImg);
          const fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        'image/jpeg',
        1
      );
    });
  }


  const submitHandler = async (e)=> {
    e.preventDefault();
    // const profile = new File([croppedImageUrl],'profile.jpeg',{type: 'image/jpeg', lastModified: Date.now()});
    // console.log("image File",profile);
    const form = new FormData();
    var file = new Blob([
        JSON.stringify(croppedImageUrl)
     ], { type: 'application/json' });
    form.append('profile', file, "profile")
    console.log("image File",form.get('profile'));
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profilePic', form, config)
      console.log(res.data)

      dispatch(fetchUser(token))

    } catch (err) {
      console.log(err)

    }
  }

  const closeHandler=(e)=>{
      setsrcImg(null);
      setimageRef(null);
      setcroppedImageUrl(null);
      props.cancelImage();
  }


    return (
        <Grid container className={classes.Crop}>
            <Grid container
                className={classes.CropGrid}
                justifyContent="center"
                alignItems="center"
                rowSpacing={1}
                sx={{
                    width:'75%',
                    height: '75%',
                    overflow: 'auto'
                }}>
                <Grid item xs={12} sm={12} md={12}
                        container
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex:'0 0 20%'
                        }}>
                    <form encType='multipart/form-data'>
                        <input 
                            type="file" 
                            name="profile"
                            onChange={onSelectFile}
                        />
                    </form>
                </Grid>
                <Grid item container
                    xs={12} sm={12} md={12}
                    className={classes.CropImageSec}>
                    <Grid item xs={12} sm={6} md={6}
                        container
                        className={classes.CropImage}>
                        {srcImg && (
                            <ReactCrop
                                className={classes.ReactCrop}
                                src={srcImg}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={onImageLoaded}
                                onComplete={onCropComplete}
                                onChange={onCropChange}
                            />
                        )}
                    </Grid>
                    <Grid item container
                        xs={12} sm={6} md={6}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Grid item sx={{ 
                            width:'90%',
                            height:'90%',
                            }}>
                            {croppedImageUrl && (
                                <img alt="Crop" 
                                    style={{ width: '100%',
                                            height: '100%' }} 
                                    src={croppedImageUrl} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container 
                    xs={12} sm={12} md={12}
                      className={classes.CropButtons} >
                    <Button variant="outlined"
                            disabled={croppedImageUrl ? false:true}
                            onClick={submitHandler}>
                        Submit
                    </Button>
                    <Button variant="outlined"
                        color="fifth"
                        onClick={closeHandler}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
      </Grid>
        
    )
}

export default CropImage;
