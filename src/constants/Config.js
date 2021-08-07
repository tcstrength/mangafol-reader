// export const axiosBaseUrl = "http://localhost:8080/api"
export const axiosBaseUrl = "https://mangafol-api.herokuapp.com/api"
// https://mangafol-api.herokuapp.com/swagger-ui/index.html

export const mapReadingStatus = (status) => {
  if (status === 1) {
    return {
      text: 'Đang theo dõi',
      variant: 'success'
    }
  } else if (status === 2) {
    return {
      text: 'Đọc xong',
      variant: 'primary'
    }
  } else {
    return {
      text: 'Ngừng theo dõi',
      variant: 'danger'
    }
  }
}

export const mapTaleFinished = (finished) => {
  if (!finished) {
    return {
      text: 'Đang viết',
      variant: 'success'
    }
  } else {
    return {
      text: 'Đã xong',
      variant: 'primary'
    }
  }
}

export const getTaleLink = (tale) => {
  return '/tales/' + tale.slug;
}