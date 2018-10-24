App = React.createClass({

    getInitialState() {
      return {
        loading: false,
        searchingText: '',
        gif: {}
      };
    },
  
    getGif: function(searchingText) {
      
        var GIPHY_PUB_KEY = 'qYJUoExqhocza5OQXzJpzFgXT2AxuaGW';
        var GIPHY_API_URL = 'https://api.giphy.com';
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; // 2
        
        return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {

          if (this.status === 200) {

            var data = JSON.parse(xhr.responseText).data;
            var gif = {
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
            };
            resolve(gif);

          } else { 
            reject(error);
          } 

        };

        xhr.send();
      
      });
      
    },

    
    handleSearch: function(searchingText) {
      this.setState({
        loading: true // 2.
      });
  
      this.getGif(searchingText)
      .then(rsponse =>
        this.setState ({
          loading: false,
          gif: gif,
          searchingText: searchingText
        })
      )
    },
  
    render: function() {
  
      var styles = {
        margin: '0 auto',
        textAlign: 'center',
        width: '60%'
      };
  
      return (
        <div style={styles}>
            <h1>search your gif!</h1>
            <p>Find gifs on <a href='http://giphy.com'>
              giphy.com</a> <br/> Naciskaj enter aby pobrać kolejne gify.</p>
              <Search onSearch={this.handleSearch}/>
          <Gif
            loading={this.state.loading}
            url={this.state.gif.url}
            sourceUrl={this.state.gif.sourceUrl}/>
        </div>
      );
    }
  });

