define( [ 'lib/react', 'lib/swipe' ], function( React, Swipe ) {

    /**
     * This is a wrapper for swipejs
     * modified from:
     * https://github.com/jed/react-swipe
     */

    var styles = {
        container: {
            overflow: "hidden",
            visibility: "hidden",
            position: "relative"
        },

        wrapper: {
            overflow: "hidden",
            position: "relative"
        },

        child: {
            float: "left",
            width: "100%",
            position: "relative"
        }
    };

    var SwipeComponent = React.createClass({

        // https://github.com/thebird/Swipe#config-options
        propTypes: {
            swipeConfig: React.PropTypes.shape({
                startSlide: React.PropTypes.number,
                speed: React.PropTypes.number,
                auto: React.PropTypes.number,
                continuous: React.PropTypes.bool,
                disableScroll: React.PropTypes.bool,
                stopPropagation: React.PropTypes.bool,
                callback: React.PropTypes.func,
                transitionEnd: React.PropTypes.func
            }),
            wrapperCssClasses: React.PropTypes.string,
            containerCssClasses: React.PropTypes.string,
            onNextSlide: React.PropTypes.func,
            onPrevSlide: React.PropTypes.func

        },

        getDefaultProps: function() {
            return {
                swipeConfig: {},
                wrapperCssClasses: '',
                containerCssClasses: '',
                onNextSlide: function(){},
                onPrevSlide: function(){}

            }
        },

        componentDidMount: function () {
            this.swipe = Swipe(this.getDOMNode(), this.props.swipeConfig);
        },

        componentWillUnmount: function () {
            this.swipe.kill();

            delete this.swipe;
        },

        next: function() {
            this.swipe.next();
        },

        prev: function() {
            this.swipe.prev();
        },

        slide: function(idx, duration) {
            this.swipe.slide(idx, duration);
        },

        render: function () {
            //var container = React.DOM.div(this.props,
            //    React.DOM.div({style: styles.wrapper},
            //        React.Children.map(this.props.children, function (child) {
            //            return React.addons.cloneWithProps(child, {style: styles.child})
            //        })
            //    )
            //)
            //
            //return React.addons.cloneWithProps(container, {style: styles.container})

            return (<div {...this.props.swipeConfig} style={styles.container} className={this.props.containerCssClasses}>
                        <div className={this.props.wrapperCssClasses} style={styles.wrapper}>
                            {this.props.children.map(function(child) {
                                return React.addons.cloneWithProps(child, {key: child.key, style: styles.child})
                            })}
                        </div>
                   </div>
            )
        }
    });

    return SwipeComponent;
});
